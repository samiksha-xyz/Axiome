from markitdown import MarkItDown
if __name__ == "__main__":
    # Example usage
    DOC_TO_CONVERT = "test.txt"
    # "https://youtu.be/A6USyp46MZI?si=02toG7qNup_ESErg"
    #"C:\\Users\\echut\\Downloads\\Geeta s Algorithms Huddles_ Depth First Search - Deconstructed.mp3"
    # "https://www.youtube.com/watch?v=V2qZ_lgxTzg"
    # "https://www.youtube.com/watch?v=A6USyp46MZI&ab_channel=GeetaChaudhry"
    # "C:\\Users\\echut\\Downloads\\2401.05856v1.pdf"
    md = MarkItDown()
    print("Converting document to markdown...")
    result = md.convert(DOC_TO_CONVERT)
    print(result.text_content)