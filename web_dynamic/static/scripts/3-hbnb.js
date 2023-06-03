function getIndex (id, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) return i;
  }
  return -1;
}

$(function () {
  const checkedAmenities = [];
  $('input[type="checkbox"]').each(function (i, checkbox) {
    $(checkbox).on('change', function () {
      const checkedId = $(checkbox).attr('data-id');
      const checkedName = $(checkbox).attr('data-name');
      if ($(checkbox).prop('checked')) {
        checkedAmenities.push({ id: checkedId, name: checkedName });
      } else {
        const index = getIndex(checkedId, checkedAmenities);
        if (index !== -1) checkedAmenities.splice(index, 1);
      }
      const amenityNames = [];
      for (const amenity of checkedAmenities) {
        amenityNames.push(amenity.name);
      }
      $('.amenities h4').text(amenityNames.join(', '));
    });
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (response) {
      for (const place of response) {
        const newArticle = $('<article>');

        const titleDiv = $('<div>').addClass('title_box');
        titleDiv.append(`<h2>${place.name}</h2`);
        titleDiv.append($('<div>').addClass('price_by_night').text(`$${place.price_by_night}`));
        newArticle.append(titleDiv);

        const infoDiv = $('<div>').addClass('information');

        let text;
        text = place.max_guest === 1 ? 'Guest' : 'Guests';
        infoDiv.append($('<div>').addClass('max_guest').text(`${place.max_guest} ${text}`));

        text = place.number_rooms === 1 ? 'Bedroom' : 'Bedrooms';
        infoDiv.append($('<div>').addClass('number_rooms').text(`${place.number_rooms} ${text}`));

        text = place.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms';
        infoDiv.append($('<div>').addClass('number_bathrooms').text(`${place.number_bathrooms} ${text}`));

        newArticle.append(infoDiv);
        newArticle.append($('<div>').addClass('description').html(place.description));

        $('section.places').append(newArticle);
      }
    }
  });
});
