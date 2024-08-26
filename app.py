from flask import Flask, render_template
import folium

app = Flask(__name__)

@app.route('/')
def index():
    # Create the Folium map
    folium_map = folium.Map(location=[20, 0], zoom_start=2)
    
    # Example participant data
    participants = [
        {
            "name": "Shahzoda",
            "role": "Participant, Mentor",
            "year": "2022–2023",
            "university": "Tashkent University of Information Technologies named after Muhammad al-Khwarizmi, Tashkent",
            "specialization": "Engineering",
            "quote": "I’m not going to limit myself just because people won’t accept the fact that I can do something else.",
            "location": [41.2995, 69.2401]  # Coordinates for Tashkent
        },
        # Add more participants with their details and coordinates here
    ]

    # Add markers with popups
    for participant in participants:
        popup_content = f"""
        <strong>{participant['name']}</strong><br>
        Role: {participant['role']}<br>
        Year of participation: {participant['year']}<br>
        The name of the university: {participant['university']}<br>
        Specialization: {participant['specialization']}<br>
        Quote: “{participant['quote']}”
        """
        folium.Marker(
            location=participant['location'],
            popup=folium.Popup(popup_content, max_width=300),
            icon=folium.Icon(icon='info-sign')
        ).add_to(folium_map)
    
    # Save map to HTML
    folium_map.save('templates/map.html')
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
