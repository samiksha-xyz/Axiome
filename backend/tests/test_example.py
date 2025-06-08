"""Example test to ensure pytest runs correctly."""

from axiome_backend import get_version, hello_axiome


def test_example():
    """Basic test that should always pass."""
    assert True


def test_hello_axiome():
    """Test the hello_axiome function."""
    result = hello_axiome()
    assert isinstance(result, str)
    assert "Axiome" in result


def test_get_version():
    """Test the get_version function."""
    version = get_version()
    assert isinstance(version, str)
    assert version == "0.1.0"
