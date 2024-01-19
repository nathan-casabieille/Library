from flask import request, Blueprint
from anime.controller import getAnimeController
from anime.controller import addAnimeController
from anime.controller import deleteAnimeController
from anime.controller import updateAnimeController
from anime.controller import getAllAnimeController

animeRoute = Blueprint('anime_route', __name__)

URL_ROUTE="/anime"

# PUT /anime, body: {anime: Anime}
@animeRoute.route(URL_ROUTE, methods=['PUT'])
def addAnimeRoute():
    data = request.json
    return addAnimeController(data)
    
# PUT /anime/<id>, body: {anime: Anime}
@animeRoute.route(f"{URL_ROUTE}/<string:id>", methods=['PUT'])
def updateAnimeRoute(id):
    data = request.json
    return updateAnimeController(id, data)

# DELETE /anime/<id>, body: {}
@animeRoute.route(f"{URL_ROUTE}/<string:id>", methods=['DELETE'])
def deleteAnimeRoute(id):
    return deleteAnimeController(id)

# GET /anime/<id>, body: {}
@animeRoute.route(f"{URL_ROUTE}/<string:id>", methods=['GET'])
def getAnimeRoute(id):
    return getAnimeController(id)

# GET /anime, body: {}
@animeRoute.route(URL_ROUTE, methods=['GET'])
def getAllAnimeRoute():
    return getAllAnimeController()