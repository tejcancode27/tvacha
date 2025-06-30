### ⚙️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/skin-classifier.git
cd skin-classifier

# Backend setup
cd backend

python -m venv venv

# Activate environment
venv\Scripts\activate        # On Windows
# OR
source venv/bin/activate     # On macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python app.py

# Frontend setup
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm start

# React runs at:   http://localhost:3000
# Flask runs at:   http://localhost:5000
