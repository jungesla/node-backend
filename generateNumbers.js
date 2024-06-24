async function generateNumbers() {
    const frequency = {};
    for (let i = 0; i < 10000; i++) {
        const random = Math.floor(Math.random() * 20) + 1;
        if (frequency[random]) {
            frequency[random]++;
        } else {
            frequency[random] = 1;
        }
    }

    console.log('Frequência dos números gerados:');
    console.log(frequency);
}

generateNumbers();
