from flask import jsonify
from database import db as database
from bson.objectid import ObjectId
from datetime import datetime, timedelta

from manga.model import Manga

collection=database["manga"]

def addMangaController(manga: Manga):
    try:
        inserted_document = collection.insert_one(manga)
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

def updateMangaController(id, data):
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

def deleteMangaController(id: str):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid document ID"}), 400
    
    result = collection.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        return jsonify({"error": "Document not found"}), 404

    return jsonify({"success": True, "message": "Document deleted successfully"}), 200

def getMangaController(id: str):
    try:
        obj_id = ObjectId(id)
    except:
        return jsonify({"error": "Invalid document ID"}), 400

    manga = collection.find_one({"_id": obj_id})

    if not manga:
        return jsonify({"error": "manga not found"}), 404

    manga["_id"] = str(manga["_id"])

    return jsonify({"success": True, "message": "manga fetched successfully", "data": manga}), 200

def getAllMangaController():
    try:
        allManga = list(collection.find({}))
        
        for manga in allManga:
            manga["_id"] = str(manga["_id"])

    except Exception as e:
        return jsonify({"error": e}), 500

    return jsonify({"success": True, "message": "Documents fetched successfully", "data": allManga}), 200

def resetLastChecksController():
    yesterday = datetime.utcnow() - timedelta(days=1)
    new_last_check = yesterday.replace(microsecond=0).isoformat() + 'Z'

    update_result = collection.update_many({}, {'$set': {'last_check': new_last_check}})

    return jsonify({"success": True, "message": "Last checks were successfully reset", "modifies": update_result.modified_count})
