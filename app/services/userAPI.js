function getUserAPI(searchUser) {
  return axios({
    url: "https://6309cda532499100327bf40e.mockapi.io/users",
    method: "GET",
    params: {
      hoTen: searchUser,
    }
  });
}

function addUserAPI(user) {
  return axios({
    url: "https://6309cda532499100327bf40e.mockapi.io/users",
    method: "POST",
    data: user,
  });
}

function deleteUserAPI(userId) {
  return axios({
    url: `https://6309cda532499100327bf40e.mockapi.io/users/${userId}`,
    method: "DELETE",
  });
}

function apigetUserById(userId) {
  return axios({
    url: `https://6309cda532499100327bf40e.mockapi.io/users/${userId}`,
    method: "GET",
  });
}

function updateUserAPI(userId, user) {
  return axios({
    url: `https://6309cda532499100327bf40e.mockapi.io/users/${userId}`,
    method: "PUT",
    data: user,
  });
}
