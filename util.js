export function get(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function spin(element, action) {

  const loadingElement = document.getElementById(element);
  if ( !loadingElement.classList.contains('spinner') ) {
    loadingElement.classList.add('spinner');
  }
  await action();
  
  loadingElement.classList.remove('spinner');
}
