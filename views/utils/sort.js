export const sorts = {
  'Newest': tags => tags.sort((a, b) => b.id - a.id),
  'Popularity': tags => tags.sort((a, b) => b.users.length - a.users.length),
  'A-Z': tags => tags.sort((a, b) => a.name < b.name ? -1 : 1)
};

export const filters = {
  'None': tags => tags,
  'Subscribed': tags => tags.filter(x => x.subscribed),
  'Not Subscribed': tags => tags.filter(x => !x.subscribed)
}
