from pydantic import BaseModel
from typing import Optional
from datetime import date
from enum import Enum

class AnimeStatus(Enum):
    FINISHED = "finished"
    ONGOING = "ongoing"
    AWAITING_NEXT_SEASON = "awaiting next season"

class AnimeGenre(Enum):
    SHONEN = "shonen"
    SHOJO = "shojo"
    SEINEN = "seinen"
    JOSEI = "josei"

class AnimeRating(Enum):
    POOR = 1,
    BELOW_AVERAGE = 2,
    AVERAGE = 3,
    GOOD = 4,
    EXCELLENT = 5
    EXCEPTIONAL = 6

class Anime(BaseModel):
    title: str
    genre: AnimeGenre
    rating: AnimeRating = None
    status: AnimeStatus
    season: int = None
    episode: int = None
    next_episode_release_date: Optional[date] = None
    picture_path: Optional[str] = None