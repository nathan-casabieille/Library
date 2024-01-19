from flask import request, Blueprint
from manga.controller import getMangaController
from manga.controller import addMangaController
from manga.controller import deleteMangaController
from manga.controller import updateMangaController
from manga.controller import getAllMangaController

mangaRoute = Blueprint('manga_route', __name__)

URL_ROUTE="/manga"

# PUT /manga, body: {manga: Manga}
@mangaRoute.route(URL_ROUTE, methods=['PUT'])
def addMangaRoute():
    data = request.json
    return addMangaController(data)
    
# PUT /manga/<id>, body: {manga: Manga}
@mangaRoute.route(f"{URL_ROUTE}/<string:id>", methods=['PUT'])
def updateMangaRoute(id):
    data = request.json
    return updateMangaController(id, data)

# DELETE /manga/<id>, body: {}
@mangaRoute.route(f"{URL_ROUTE}/<string:id>", methods=['DELETE'])
def deleteMangaRoute(id):
    return deleteMangaController(id)

# GET /manga/<id>, body: {}
@mangaRoute.route(f"{URL_ROUTE}/<string:id>", methods=['GET'])
def getMangaRoute(id):
    return getMangaController(id)

# GET /manga, body: {}
@mangaRoute.route(URL_ROUTE, methods=['GET'])
def getAllMangaRoute():
    return getAllMangaController()