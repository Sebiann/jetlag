window.addEventListener('DOMContentLoaded', () => {
	const noteFields = document.querySelectorAll('.investigation-notes');
	const customFields = document.querySelectorAll('.investigation-custom');
	const page = window.location.pathname.split('/').pop().replace('.astro', '').replace('.html', '');
	noteFields.forEach((input, idx) => {
		const key = `${page}_note_${idx}`;
		// Load saved value
		const saved = localStorage.getItem(key);
		if (saved !== null) input.value = saved;
		// Save on change
		input.addEventListener('input', () => {
			localStorage.setItem(key, input.value);
		});
	});
	customFields.forEach((input, idx) => {
		const key = `${page}_custom_${idx}`;
		const saved = localStorage.getItem(key);
		if (saved !== null) input.value = saved;
		input.addEventListener('input', () => {
			localStorage.setItem(key, input.value);
		});
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const resetBtn = document.querySelector('.reset-btn');
	resetBtn.addEventListener('click', () => {
		localStorage.clear();
		document.querySelectorAll('.investigation-notes').forEach(input => {
			input.value = '';
		});
		// Unselect all photo buttons
		const page = window.location.pathname.split('/').pop().replace('.astro', '').replace('.html', '');
		document.querySelectorAll('.photo-btn').forEach((btn, idx) => {
			btn.classList.remove('selected');
			const key = `${page}_photo_selected_${idx}`;
			localStorage.setItem(key, false);
		});
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const page = window.location.pathname.split('/').pop().replace('.astro', '').replace('.html', '');
	const buttons = document.querySelectorAll('.photo-btn');
	// Restore selection
	buttons.forEach((btn, idx) => {
		const key = `${page}_photo_selected_${idx}`;
		if (localStorage.getItem(key) === 'true') {
			btn.classList.add('selected');
		}
		btn.addEventListener('click', () => {
			btn.classList.toggle('selected');
			localStorage.setItem(key, btn.classList.contains('selected'));
		});
	});
});

// Toggle curse description visibility
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.curse-title').forEach((btn) => {
		btn.addEventListener('click', () => {
			const desc = btn.parentElement.querySelector('.curse-desc');
			const cost = btn.parentElement.querySelector('.curse-cost');
			// Initialize display to 'none' if not set
			if (desc.style.display === '') desc.style.display = 'none';
			if (cost.style.display === '') cost.style.display = 'none';
			// Toggle display
			desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
			cost.style.display = cost.style.display === 'none' ? 'block' : 'none';
		});
	});
});