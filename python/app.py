from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import spacy
import gensim
from gensim import corpora
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load LDA Model (Topic Modeling)
nlp = spacy.load("en_core_web_sm")

# Load T5 Model (Semantic Similarity)
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

def lda_topic_score(reference, student):
    """Compute topic coverage score using LDA."""
    texts = [reference.split(), student.split()]
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda_model = gensim.models.LdaModel(corpus, num_topics=3, id2word=dictionary, passes=10)
    
    ref_topics = lda_model[dictionary.doc2bow(reference.split())]
    stu_topics = lda_model[dictionary.doc2bow(student.split())]

    ref_vector = [t[1] for t in ref_topics]
    stu_vector = [t[1] for t in stu_topics]

    if len(ref_vector) == len(stu_vector):
        return cosine_similarity([ref_vector], [stu_vector])[0][0]
    return 0.0

def semantic_similarity_score(reference, student):
    """Compute semantic similarity using a T5 model."""
    input_text = f"stsb sentence1: {reference} sentence2: {student}"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids
    output = model.generate(input_ids)
    score = tokenizer.decode(output[0], skip_special_tokens=True)
    return float(score) if score.replace('.', '', 1).isdigit() else 0.5

def coherence_score(student):
    """Basic coherence score using sentence structure (Placeholder)."""
    doc = nlp(student)
    return min(len(set([token.dep_ for token in doc])), 1.0)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    answers = data.get("answers", [])

    results = []
    for item in answers:
        question = item["question"]
        reference = item["referenceAnswer"]
        student = item["studentAnswer"].strip()

        if not student:
            total_score = 0.0
            lda_score = 0.0
            semantic_score = 0.0
            coherence = 0.0
        else:
            # Compute Scores
            lda_score = lda_topic_score(reference, student) * 3  # 30% of 10
            semantic_score = semantic_similarity_score(reference, student)  # 50% of 10 
            coherence = coherence_score(student) * 2  # 20% of 10
            total_score = lda_score + semantic_score + coherence

        results.append({
            "question": question,
            "student": student,
            "reference": reference,
            "score": round(total_score, 2),
            "lda": lda_score,
            "t5": semantic_score,
            "coherence": coherence
        })

    return jsonify({"scores": results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
