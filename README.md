# Technovation Analytics - Interactive Map

This project provides an interactive map of Technovation Girls alumni, developed using **Flask** and **Folium**. The map displays dashboards and datasets showcasing the current roles, projects, and contributions of alumni in the tech industry, entrepreneurship, and beyond.

## Project Structure

- `app.py`: The main application file that initializes the Flask server, handles routing, and renders templates.
- `templates/`: Contains HTML templates for the web pages.
  - `index.html`: The landing page template.
  - `map.html`: The template that displays the Folium map.
- `static/`: Stores static files like CSS, JavaScript, and images used across the application.
  - `css/`: Stylesheets for the project.
  - `js/`: JavaScript files.
  - `img/`: Images used in the templates.
- `requirements.txt`: Lists the dependencies needed for the project, including Flask and Folium.
- `.gitignore`: Ensures unnecessary files are excluded from version control.

## Features

- **Interactive Map (Folium)**: Displays geographical data of Technovation Girls alumni.
- **Flask Backend**: Powers the web app and serves the dynamic map.
- **Dashboards**: Displays alumni projects and contributions.
- **Responsive Design**: The interface is designed to work across devices.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/technovation-analytics.git
    ```

2. Navigate to the project directory:
    ```bash
    cd technovation-analytics
    ```

3. Create a virtual environment (optional but recommended):
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

4. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Run the Flask application:
    ```bash
    python app.py
    ```

6. Open your browser and go to `http://127.0.0.1:5000/` to view the map.

## Dependencies

The project requires the following dependencies (listed in `requirements.txt`):

- **Flask**: Web framework for Python.
- **Folium**: Python library for visualizing data on an interactive map.
- Additional dependencies are listed in the `requirements.txt`.

## How to Contribute

Feel free to fork the repository, create a new branch, and submit a pull request with any new features or fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue or contact the project maintainer at ntillayeva@gmail.com
