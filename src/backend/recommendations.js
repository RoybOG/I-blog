
export function recommendations_afterUpdate(item, context) {
  item.authorName = item.authorName + '1';
  console.log(item)
  return item;
}