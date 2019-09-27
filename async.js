function _async (generator, prev) {
    if (!generator.next) {
        generator = generator();
    }
    const itRes = generator.next(prev);
    return itRes.done ? itRes.value : itRes.value.then(r => _async(generator, r), e => generator.throw(e));
}

let fetchData = _async(function* (id) {
    let user = (yield fetchUser(id)),
        friends = (yield fetchFriends(id));
    return {
        user,
        friends
    };
});

