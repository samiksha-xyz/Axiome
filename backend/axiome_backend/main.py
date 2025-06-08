"""Main entry point for the Axiome backend."""

from axiome_backend import get_version, hello_axiome


def main() -> None:
    """Main function."""
    print(hello_axiome())
    print(f"Version: {get_version()}")


if __name__ == "__main__":
    main()

