from PIL import Image

def xiaolin_wu(x0, y0, x1, y1, width, height):
    """
    Rasterize a line using Xiaolin Wu's line algorithm with anti-aliasing.

    Args:
    x0 (int): The x-coordinate of the starting point.
    y0 (int): The y-coordinate of the starting point.
    x1 (int): The x-coordinate of the ending point.
    y1 (int): The y-coordinate of the ending point.
    width (int): The width of the output matrix.
    height (int): The height of the output matrix.

    Returns:
    list: A 2D list representing the rasterized line as a matrix.
    """

    # Initialize the output matrix with zeros
    matrix = [[0.0 for _ in range(width)] for _ in range(height)]

    # Calculate the differences in x and y coordinates
    dx = x1 - x0
    dy = y1 - y0

    # Determine the direction of the line
    steps = max(abs(dx), abs(dy))
    x_step = dx / steps
    y_step = dy / steps

    # Iterate over the line
    x, y = x0, y0
    for _ in range(int(steps) + 1):
        # Check if the current point is within the matrix bounds
        if 0 <= int(x) < width and 0 <= int(y) < height:
            # Calculate the intensity of the current pixel
            fraction_x = x - int(x)
            fraction_y = y - int(y)

            # Assign the intensity to the current pixel and its adjacent pixels
            if 0 <= int(x) < width and 0 <= int(y) < height:
                matrix[int(y)][int(x)] = max(matrix[int(y)][int(x)], 1.0 - max(fraction_x, fraction_y))
            if 0 <= int(x) + 1 < width and 0 <= int(y) < height:
                matrix[int(y)][int(x) + 1] = max(matrix[int(y)][int(x) + 1], fraction_x)
            if 0 <= int(x) < width and 0 <= int(y) + 1 < height:
                matrix[int(y) + 1][int(x)] = max(matrix[int(y) + 1][int(x)], fraction_y)
            if 0 <= int(x) + 1 < width and 0 <= int(y) + 1 < height:
                matrix[int(y) + 1][int(x) + 1] = max(matrix[int(y) + 1][int(x) + 1], fraction_x * fraction_y)

        # Move to the next point on the line
        x += x_step
        y += y_step

    return matrix

# Example usage:
x0, y0 = 10, 30
x1, y1 = 40, 15
width, height = 50, 50
matrix = xiaolin_wu(x0, y0, x1, y1, width, height)

# Create a Pillow image from the matrix
img = Image.new('L', (width, height))
pixels = img.load()
for y in range(height):
    for x in range(width):
        # Map the intensity value to a grayscale value
        intensity = int(matrix[y][x] * 255)
        pixels[x, y] = intensity

# Save the image as a PNG file
img.save('line.png')

print("Image saved as line.png")