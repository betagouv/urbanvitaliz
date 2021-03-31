

const urlSafeCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.split('');

const generateForCustomCharacters = (length, characters) => {
	// Generating entropy is faster than complex math operations, so we use the simplest way
	const characterCount = characters.length;
	const maxValidSelector = (Math.floor(0x10000 / characterCount) * characterCount) - 1; // Using values above this will ruin distribution when using modular division
	const entropyLength = 2 * Math.ceil(1.1 * length); // Generating a bit more than required so chances we need more than one pass will be really low
	let string = '';
	let stringLength = 0;

	while (stringLength < length) { // In case we had many bad values, which may happen for character sets of size above 0x8000 but close to it
		//entropyLength est un number // c'est ce que contient entropyLenght qui détermine combien de bytes on attend à la sorti.
		//const entropy = crypto.randomBytes(entropyLength); // elle me retourne une instance de la class Buffer = il contient entropyLenght bytes = qui sont de bytes aléatroire
		const entropy = new Uint16Array(entropyLength)
		crypto.getRandomValues(entropy)
		let entropyPosition = 0;

		while (entropyPosition < entropyLength && stringLength < length) {
			const entropyValue = entropy[entropyPosition];
			entropyPosition += 2;
			if (entropyValue > maxValidSelector) { // Skip values which will ruin distribution when using modular division
				continue;
			}

			string += characters[entropyValue % characterCount];
			stringLength++;
		}
	}

	return string;
};

const allowedTypes = [
	undefined,
	'url-safe',
];

const createGenerator = (generateForCustomCharacters) => ({length, type, characters}) => {
	if (!(length >= 0 && Number.isFinite(length))) {
		throw new TypeError('Expected a `length` to be a non-negative finite number');
	}

	if (type !== undefined && characters !== undefined) {
		throw new TypeError('Expected either `type` or `characters`');
	}

	if (characters !== undefined && typeof characters !== 'string') {
		throw new TypeError('Expected `characters` to be string');
	}

	if (!allowedTypes.includes(type)) {
		throw new TypeError(`Unknown type: ${type}`);
	}

	if (type === 'url-safe') {
		return generateForCustomCharacters(length, urlSafeCharacters);
	}

	return generateForCustomCharacters(length, characters.split(''));
};

export default createGenerator(generateForCustomCharacters);

