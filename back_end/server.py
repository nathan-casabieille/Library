from flask import Flask
from flask_cors import CORS

from upload.routes import uploadRoute
from manga.routes import mangaRoute
from anime.routes import animeRoute

app = Flask(__name__)

CORS(app)

app.register_blueprint(uploadRoute)
app.register_blueprint(mangaRoute)
app.register_blueprint(animeRoute)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)