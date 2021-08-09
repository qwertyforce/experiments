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
const find_mid_node = function (head) {
    let slow = head
    let fast = head
    while (fast?.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow
};