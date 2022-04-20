function buildAssignmentLinks(parent, links) {
  console.log(links);
  for(link of links) {
    console.log(link);
    const listItem = document.createElement('li');
    const a = document.createElement('a');
    a.href = link.url;
    a.title = link.label;
    a.appendChild(document.createTextNode(link.label));
    listItem.appendChild(a);
    parent.appendChild(listItem);
  }
}