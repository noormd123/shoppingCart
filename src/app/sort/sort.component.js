import {sortTemplate} from './sort.template';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';

export class SortComponent {
    constructor() {
       
    }

    render() {
       return sortTemplate();
    }

    addSortEvents() {
        document.querySelectorAll('.sort').forEach(item => {
            item.addEventListener('click', event => {
                let direction = item.getAttribute('sort-direction');
				let shoppingList = new ShoppingListComponent();
                shoppingList.sortData(direction);
            });
        });
    }
}