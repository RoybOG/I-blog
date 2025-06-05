
export function recommendations_afterUpdate(item, context) {
  item.title = item.title + '1';
  console.log(item)
  return item;
}