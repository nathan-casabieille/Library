from pydantic import BaseModel
from typing import Optional
from datetime import date
from enum import Enum

class MangaStatus(Enum):
    FINISHED = "finished"
    ONGOING = "ongoing"

class MangaGenre(Enum):
    SHONEN = "shonen"
    SHOJO = "shojo"
    SEINEN = "seinen"
    JOSEI = "josei"

class MangaRating(Enum):
    POOR = 1,
    BELOW_AVERAGE = 2,
    AVERAGE = 3,
    GOOD = 4,
    EXCELLENT = 5
    EXCEPTIONAL = 6

class Manga(BaseModel):
    title: str
    genre: MangaGenre
    rating: MangaRating = None
    status: MangaStatus
    chapter: int = None
    last_release_date: Optional[date] = None
    last_check: Optional[date]
    picture_path: Optional[str] = None