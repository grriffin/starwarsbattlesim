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

export async function spinWhile(loadingElement, action) {
  if (!loadingElement.classList.contains('spinner')) {
    loadingElement.classList.add('spinner');
  }
  try {
    await action();
  } finally {
    loadingElement.classList.remove('spinner');
  }
}

export function spin(element) {
  if (!element.classList.contains('spinner')) {
    element.classList.add('spinner');
  }
}

export function unspin(element) {
  element.classList.remove('spinner');
}
