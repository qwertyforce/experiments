/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
const reverse_linked_list = function (head) {
    let prev;
    while (head) {
        const next = head.next
        head.next = prev
        prev = head
        head = next
    }
    return head
};