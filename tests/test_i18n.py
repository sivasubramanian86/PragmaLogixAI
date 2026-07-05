"""
Tests for i18n / language switching completeness.
All 22 supported languages must provide the required UI string keys.
"""
import pytest
from PragmaLogixAI.frontend_i18n_validator import validate_translations  # will create this


REQUIRED_KEYS = [
    "title", "subtitle", "uploadSignal", "uploadHelp",
    "tomorrowPlan", "frictionBudget", "logisticsRadar",
    "generatePlan", "hourlySchedule", "frictionActions",
    "lifeDiffs", "lintWarnings", "profileLabel", "ingestSummary",
]

SUPPORTED_LANGUAGES = [
    "en", "hi", "ta", "kn", "te", "es", "fr", "de", "it", "ja",
    "zh", "pt", "ru", "ko", "ar", "tr", "nl", "sv", "pl", "vi", "th", "id"
]


@pytest.mark.parametrize("lang", SUPPORTED_LANGUAGES)
def test_all_languages_have_required_keys(lang: str):
    """Every supported language must have all required UI string keys non-empty."""
    translations = validate_translations()
    assert lang in translations, f"Language '{lang}' missing from translations"
    t = translations[lang]
    for key in REQUIRED_KEYS:
        assert key in t, f"Missing key '{key}' in language '{lang}'"
        assert t[key], f"Empty value for key '{key}' in language '{lang}'"


def test_nav_field_present_in_all_languages():
    """All languages must have nav translations."""
    translations = validate_translations()
    nav_keys = ["dashboard", "features", "about", "faq", "help", "settings"]
    for lang in SUPPORTED_LANGUAGES:
        t = translations[lang]
        assert "nav" in t, f"Missing 'nav' field in language '{lang}'"
        for nav_key in nav_keys:
            assert nav_key in t["nav"], f"Missing nav key '{nav_key}' in language '{lang}'"
