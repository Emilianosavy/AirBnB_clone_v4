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
});
