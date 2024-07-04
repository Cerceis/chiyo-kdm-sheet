import { ref, Ref } from "vue";

const suggestions = ["#bone", "#hide", "#organ", "#scrap", "#herb", "#vermin", "#consumable"];

let currentIndex: number = -1;
export const currentUID: Ref<string> = ref("")

export const acCheckInput = (e: any, uid: string, item: any) => {
	let input = e.target.value;
	currentUID.value = uid
	if (input.includes('#')) {
		let query = input.split('#').pop();
		showSuggestions(e, query, item);
	} else {
		clearSuggestions();
	}
}

export const acInitSuggestion = (e: any) => {
	if(!currentUID.value) return;
	const suggestionBox = document.getElementById(currentUID.value);
	if(!suggestionBox) return;
    const suggestionItems = suggestionBox.getElementsByClassName('autocomplete-suggestion');

	if (e.key === 'Tab' || e.key === 'ArrowDown') {
		e.preventDefault();
		if (suggestionItems.length > 0) {
			currentIndex = (currentIndex + 1) % suggestionItems.length;
			updateActiveSuggestion(suggestionItems);
		}
	} else if (e.key === 'ArrowUp') {
		e.preventDefault();
		if (suggestionItems.length > 0) {
			currentIndex = (currentIndex - 1 + suggestionItems.length) % suggestionItems.length;
			updateActiveSuggestion(suggestionItems);
		}
	} else if (e.key === 'Enter') {
		e.preventDefault();
		if (currentIndex >= 0 && currentIndex < suggestionItems.length) {
			(suggestionItems[currentIndex] as unknown as any).click();
			return true;
		}
	}
}

export const showSuggestions = (e: KeyboardEvent, query: string, item: any) => {
	if(!currentUID.value) return;
	const suggestionBox = document.getElementById(currentUID.value);
	if(!suggestionBox) return;
	suggestionBox.innerHTML = '';
	currentIndex = -1;
	const filteredSuggestions = suggestions.filter(suggestion => suggestion.includes(query));
 	filteredSuggestions.forEach(suggestion => {
		const suggestionItem = document.createElement('div');
		suggestionItem.classList.add('autocomplete-suggestion');
		suggestionItem.textContent = suggestion;
		suggestionItem.addEventListener('click', () => {
			item.text = item.text.split('#').slice(0, -1).join('#') + '#' + suggestion.replace('#', '') + " ";
			/**
			 * First tag,
			 * when a first tag is detected, and a | infront to split it visually.
			 */
			const iT = item.text.split(" ");
			for(let i = 0; i < iT.length; i++){
				if(iT[i].charAt(0) === "|")
					break;
				if(iT[i].charAt(0) === "#"){
					iT[i] = `|${iT[i]}`;
					break;
				}
			}
			item.text = iT.join(" ")
			clearSuggestions();
		});
		suggestionBox.appendChild(suggestionItem);
	});
}

export const updateActiveSuggestion = (suggestionItems: HTMLCollectionOf<Element>) => {
	Array.from(suggestionItems).forEach(item => item.classList.remove('active'));
	if (currentIndex >= 0 && currentIndex < suggestionItems.length) {
		suggestionItems[currentIndex].classList.add('active');
		suggestionItems[currentIndex].scrollIntoView({
			block: 'nearest',
			inline: 'nearest'
		});
	}
}

export const clearSuggestions = () => {
	if(!currentUID.value) return;
	const suggestionBox = document.getElementById(currentUID.value);
	if(!suggestionBox) return;
	suggestionBox.innerHTML = '';
	currentIndex = -1;
	currentUID.value = "";
}