import isInDOM from './IsInDom'

export default function hasParent(element, root) {
  return root && root.contains(element) && isInDOM(element)
}