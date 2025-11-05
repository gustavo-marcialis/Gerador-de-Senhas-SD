const CACHE_KEY = 'lastPasswordPattern';

        document.addEventListener('DOMContentLoaded', () => {
            const generateButton = document.getElementById('generateButton');
            const copyButton = document.getElementById('copyButton');
            const passwordOutput = document.getElementById('passwordOutput');
            const copyAlert = document.getElementById('copyAlert');
            const passwordPatternSelect = document.getElementById('passwordPattern');

            // --- Lógica de Cache (localStorage) ---
            
            const loadCachedPattern = () => {
                const cachedPattern = localStorage.getItem(CACHE_KEY);
                if (cachedPattern) {
                    passwordPatternSelect.value = cachedPattern;
                }
            };

            const saveCurrentPattern = () => {
                localStorage.setItem(CACHE_KEY, passwordPatternSelect.value);
            };

            loadCachedPattern();
            passwordPatternSelect.addEventListener('change', saveCurrentPattern);

            // --- Funções de Geração de Senha ---
            
            const generateSegurosUnimedPassword = () => {
                const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
                const numbers = '0123456789';
                const requiredChar = '@';
                const allChars = lowercaseChars + numbers;

                let password = '';
                const passwordLength = 12;

                const atIndex = Math.floor(Math.random() * passwordLength);
                
                for (let i = 0; i < passwordLength; i++) {
                    if (i === atIndex) {
                        password += requiredChar;
                    } else {
                        const randomIndex = Math.floor(Math.random() * allChars.length);
                        password += allChars[randomIndex];
                    }
                }
                return password;
            };

            const generateLeroyMerlinPassword = () => {
                return generateSegurosUnimedPassword();
            };

            const generateB3Password = () => {
                return generateSegurosUnimedPassword();
            };
            
            const generatePassword = () => {
                const selectedPattern = passwordPatternSelect.value;
                
                switch (selectedPattern) {
                    case 'seguros_unimed':
                        return generateSegurosUnimedPassword();
                    case 'leroy_merlin':
                        return generateLeroyMerlinPassword();
                    case 'b3':
                        return generateB3Password();
                    default:
                        return generateSegurosUnimedPassword();
                }
            };

            // --- Lógica de Cópia ---

            const copyPassword = async () => {
                if (passwordOutput.value) {
                    try {
                        await navigator.clipboard.writeText(passwordOutput.value);
                        
                        copyAlert.classList.remove('opacity-0');
                        copyAlert.classList.add('opacity-100');

                        setTimeout(() => {
                            copyAlert.classList.remove('opacity-100');
                            copyAlert.classList.add('opacity-0');
                        }, 2000);
                    } catch (err) {
                        console.error('Falha ao copiar a senha: ', err);
                    }
                }
            };

            // --- Event Listeners e Inicialização ---
            
            generateButton.addEventListener('click', () => {
                saveCurrentPattern(); 
                passwordOutput.value = generatePassword();
            });

            copyButton.addEventListener('click', copyPassword);

            // Garante que o campo de senha está vazio ao iniciar
            passwordOutput.value = ''; 
        });