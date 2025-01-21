from PIL import Image
def bresenham(x0, y0, x1, y1, width, height):
    
    """
    Rasterize a line using Bresenham's line algorithm.

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
    matrix = [[1 for _ in range(width)] for _ in range(height)]

    # Calculate the differences in x and y coordinates
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)

    # Determine the direction of the line
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1

    # Initialize the error term
    err = dx - dy

    # Iterate over the line
    while True:
        # Check if the current point is within the matrix bounds
        if 0 <= x0 < width and 0 <= y0 < height:
            # Mark the current point as part of the line
            matrix[y0][x0] = 0

        # Check if we've reached the end of the line
        if x0 == x1 and y0 == y1:
            break

        # Update the error term
        e2 = 2 * err

        # Move horizontally if the error term is greater than -dy
        if e2 > -dy:
            err -= dy
            x0 += sx

        # Move vertically if the error term is less than dx
        if e2 < dx:
            err += dx
            y0 += sy

    return matrix

# Example usage:
x0, y0 = 10, 30
x1, y1 = 40, 15
width, height = 50, 50
matrix = bresenham(x0, y0, x1, y1, width, height)

# Print the output matrix
for row in matrix:
    print(' '.join(['.' if cell else '#' for cell in row]))

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