$(document).ready(function () {

// Открытие,закрытие мобильного меню

 $('.burger').on('click', function () {
   $('.main-nav').slideToggle();
 })


 //Фильтрация в портфолио
 $('.filter-link').on('click', function (e) {
  e.preventDefault();
  let dataFilter = $(this).data('filter');

  $('.filter-link').removeClass('active');
  $(this).addClass('active');

  if (dataFilter === 'all') {
    $('.catalog-item').show();
    return;
  }

  $('.catalog-item').each(function () {
    let dataType = $(this).data('type');

    if (dataFilter === dataType) {
      $(this).show();
      return;
    }

    $(this).hide();
  });

});

$('.j-catalog-btn').on('click', function () {

  $.ajax({
    type: 'POST',
    url: '../json/catalog.json',
    data: 'count=4',
    success: function (response) {
      createHtml(response.butterflys);
    },
    error: function () {
      console.log('error');
    }
  });

});

function createHtml(butterflysArray) {
  let newHtml = '';

  for (let i = 0; i < butterflysArray.length; i++) {
    newHtml = newHtml + `
    <li class="catalog-item" data-type="strict">
      <figure class="portfolio-figure">
          <img src="${butterflysArray[i].imageUrl}" alt="${butterflysArray[i].imageAlt}" class="portfolio-image">
          <figcaption class="portfolio-desc">${butterflysArray[i].text}</figcaption>
      </figure>
    </li>`;
  }

  addToPage(newHtml);
}

function addToPage(htmlString) {
  $('.catalog-list').append(htmlString);
}













 //Табы на странице контактов
 $('.tabs-link').on('click', function (e) {
  e.preventDefault();
  const activeClass = 'active';
  let index = $(this).index('.tabs-link');

  $('.tabs-link').removeClass(activeClass);
  $(this).addClass(activeClass);

  $('.contacts-content').removeClass(activeClass);
  $('.contacts-content').eq(index).addClass(activeClass);
});

 // Аккардеоны на странице FAQ
 let prevIndex;
 $('.accordeon-question').on('click', function () {
   const currentIndex = $(this).index('.accordeon-question');

   if (prevIndex === currentIndex) {
     $(this).next().slideToggle();
     return;
   }

   $('.accordeon-answear').slideUp();
   $(this).next().slideDown();

   prevIndex = currentIndex;
 })

 // Галерея отзывов , слайдер
 if ($('.reviews-wrap').length) {
  $('.reviews-wrap').slick({
    dots: true
  });
}





})
