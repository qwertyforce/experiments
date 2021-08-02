/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = function (head) {
    let pointer_1 = head
    let pointer_2 = head

    while (pointer_2 && pointer_2?.next?.next) {
        pointer_1 = pointer_1.next
        pointer_2 = pointer_2.next.next
        if (pointer_1 === pointer_2) {
            return true
        }
    }

    return false
};