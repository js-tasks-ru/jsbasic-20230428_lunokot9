function makeFriendsList(friends) {
    let friendsListUl = document.createElement('ul');

    friends.forEach(item => {
        friendsListUl.innerHTML += `<li>${item.firstName} ${item.lastName}</li>`;
    });

    return friendsListUl;
}
