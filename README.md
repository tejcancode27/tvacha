## ⚙️ Setup Instructions

# Clone the repository
git clone https://github.com/yourusername/skin-classifier.git
cd skin-classifier

# ---- Backend Setup (Flask + ML) ----
cd backend

# Create a virtual environment
python -m venv venv

# Activate the environment
venv\Scripts\activate        # On Windows
# OR
source venv/bin/activate     # On macOS/Linux

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py

# ---- Frontend Setup (React) ----
cd ../frontend

# Install React dependencies
npm install

# Start the React development server
npm start

# React runs at:   http://localhost:3000
# Flask runs at:   http://localhost:5000
