from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

# ✅ Load your model (corrected path)
MODEL_PATH = "model/my_model.h5"
assert os.path.exists(MODEL_PATH), f"Model file not found at {MODEL_PATH}"
model = tf.keras.models.load_model(MODEL_PATH)

# ✅ Class names in correct order
class_names = [
    "Actinic Keratoses (Pre-cancerous Lesion)",
    "Basal Cell Carcinoma (Common Skin Cancer)",
    "Benign Keratosis (Non-cancerous Lesion)",
    "Dermatofibroma (Fibrous Skin Lesion)",
    "Melanoma (Serious Skin Cancer)",
    "Melanocytic Nevus (Mole)",
    "Vascular Lesion (Blood Vessel Lesion)"
]

# ✅ Preprocess the image
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))  # Adjust to match model input
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

# ✅ Prediction endpoint
@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    image_bytes = file.read()
    processed_image = preprocess_image(image_bytes)

    predictions = model.predict(processed_image)
    class_idx = np.argmax(predictions)
    confidence = float(np.max(predictions))

    return jsonify({
        "predicted_class": class_names[class_idx],
        "confidence": round(confidence, 3),
        "all_class_probabilities": {
            class_names[i]: round(float(prob), 3)
            for i, prob in enumerate(predictions[0])
        }
    })

if __name__ == "__main__":
    app.run(debug=True)
