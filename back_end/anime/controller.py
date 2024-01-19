from flask import jsonify
from database import db as database
from bson.objectid import ObjectId

from anime.model import Anime

collection=database["anime"]

def addAnimeController(anime: Anime):
    try:
        inserted_document = collection.insert_one(anime)
        id = inserted_document.inserted_id

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    inserted_object = collection.find_one({"_id": id})
    inserted_object["_id"] = str(inserted_object["_id"])

    return jsonify({
        "success": True,
        "message": "Document added successfully",
        "id": str(id),
        "inserted_object": inserted_object
    }), 200

def updateAnimeController(id, data):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"success": False, "message": "Invalid id format"}), 400
    
    if not data:
        return jsonify({"success": False, "message": "No fields to update"}), 400
    
    existing_document = collection.find_one({"_id": obj_id})
    if existing_document is None:
        return jsonify({"success": False, "message": "Document with given id does not exist"}), 404
    
    update_result = collection.update_one({"_id": obj_id}, {"$set": data})
    
    if update_result.modified_count == 0:
        return jsonify({"success": False, "message": "No changes made to the document"}), 200
    
    updated_document = collection.find_one({"_id": obj_id})
    updated_document["_id"] = str(updated_document["_id"])

    return jsonify({
        "success": True,
        "message": "Document modified successfully",
        "updated_object": updated_document
    }), 200

def deleteAnimeController(id: str):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid document ID"}), 400
    
    result = collection.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        return jsonify({"error": "Document not found"}), 404

    return jsonify({"success": True, "message": "Document deleted successfully"}), 200

def getAnimeController(id: str):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid document ID"}), 400

    anime = collection.find_one({"_id": obj_id})

    if not anime:
        return jsonify({"error": "anime not found"}), 404

    anime["_id"] = str(anime["_id"])

    return jsonify({"success": True, "message": "anime fetched successfully", "data": anime}), 200

def getAllAnimeController():
    try:
        allAnime = list(collection.find({}))
        
        for anime in allAnime:
            anime["_id"] = str(anime["_id"])

    except Exception as e:
        return jsonify({"error": e}), 500

    return jsonify({"success": True, "message": "Documents fetched successfully", "data": allAnime}), 200