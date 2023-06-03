function getIndex(id, array) {
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
        checkedAmenities.push({id: checkedId, name: checkedName});
      } else {
        index = getIndex(checkedId, checkedAmenities);
	if (index !== -1) checkedAmenities.splice(index, 1);
      }
      const amenityNames = [];
      for (let amenity of checkedAmenities) {
        amenityNames.push(amenity.name);
      }
      $('.amenities h4').text(amenityNames.join(', ')); 
    });
  });
});
