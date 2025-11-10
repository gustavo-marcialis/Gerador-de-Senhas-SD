const CACHE_KEY = 'lastPasswordPattern';

// --- Configuração do Supabase (Suas chaves) ---
const SUPABASE_URL = 'https://hapnzfaqqyevewsxblht.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhcG56ZmFxcXlldmV3c3hibGh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mjc5MTEsImV4cCI6MjA3ODIwMzkxMX0.Y5lnxu5EZAC7lm4JX54CMwUU2zyaYZCAVZzRRdrMO7Y';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Variável global para armazenar os padrões buscados
let operacoesPatterns = [];

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const copyButton = document.getElementById('copyButton');
    const passwordOutput = document.getElementById('passwordOutput');
    const passwordPatternSelect = document.getElementById('passwordPattern');

    // --- Lógica de Cache (Mantida) ---
    
    const loadCachedPattern = () => {
        const cachedPattern = localStorage.getItem(CACHE_KEY);
        if (cachedPattern) {
            passwordPatternSelect.value = cachedPattern;
        }
    };

    const saveCurrentPattern = () => {
        localStorage.setItem(CACHE_KEY, passwordPatternSelect.value);
    };

    // --- Lógica de Geração de Senha (Adaptada) ---

    const populatePatternSelect = (patterns) => {
        passwordPatternSelect.innerHTML = ''; // Limpa o "Carregando..."

        if (!patterns || patterns.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Nenhum padrão encontrado';
            passwordPatternSelect.appendChild(option);
            return;
        }

        patterns.forEach(pattern => {
            const option = document.createElement('option');
            option.value = pattern.id; 
            option.textContent = pattern.operation_name; 
            passwordPatternSelect.appendChild(option);
        });
    };

    const loadPatternsFromSupabase = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('operation_patterns')
                .select('id, operation_name, password_rules');

            if (error) {
                console.error('Erro ao buscar padrões:', error);
                populatePatternSelect(null); 
                return;
            }

            operacoesPatterns = data; 
            populatePatternSelect(data); 
            loadCachedPattern(); 

        } catch (err) {
            console.error('Erro inesperado:', err);
            populatePatternSelect(null);
        }
    };

    // --- INÍCIO DA GRANDE MUDANÇA ---
    /**
     * Esta função foi REESCRITA para corresponder à estrutura 'PasswordRules' 
     * do seu ficheiro supabase.ts
     */
    const generateGenericPassword = (pattern) => {
        
        const rules = pattern.password_rules;
        if (!rules) return "Erro: Padrão não configurado";

        // Mapeia as chaves do seu objeto 'PasswordRules'
        const {
            length,
            requireUppercase,
            requireLowercase,
            requireNumber,
            requireSpecial,
            allowedSpecialChars 
        } = rules;

        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        // Usa os caracteres especiais definidos no banco de dados
        const specialChars = allowedSpecialChars || '!@#$%^&*()'; 

        let allChars = ''; // O "banco" de caracteres para o preenchimento
        let guaranteedChars = []; // Os caracteres obrigatórios
        
        if (requireLowercase) {
            allChars += lowercaseChars;
            guaranteedChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
        }
        if (requireUppercase) {
            allChars += uppercaseChars;
            guaranteedChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
        }
        if (requireNumber) {
            allChars += numberChars;
            guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
        }
        if (requireSpecial) {
            allChars += specialChars;
            guaranteedChars.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
        }

        // Se nenhuma regra for marcada (ex: tudo false), 'allChars' estará vazio.
        // Isso causaria um erro. Vamos usar minúsculas como padrão nesse caso.
        if (allChars === '') {
            if (!requireLowercase) { // Apenas se o minúsculas também não foi obrigado
                 allChars = lowercaseChars;
            } else {
                return "Erro: Padrão sem caracteres"; // Erro de segurança
            }
        }

        const remainingLength = length - guaranteedChars.length;
        let passwordArray = [...guaranteedChars]; // Começa com os obrigatórios

        // Preenche o resto da senha com caracteres do "banco"
        for (let i = 0; i < remainingLength; i++) {
            passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }

        // Embaralha o array para que os caracteres obrigatórios não fiquem sempre no início
        // (Usando o shuffle de Fisher-Yates, mais confiável)
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        return passwordArray.join('');
    };
    // --- FIM DA GRANDE MUDANÇA ---


    /**
     * Função principal chamada pelo botão "Gerar Senha" (Mantida)
     */
    const generatePassword = () => {
        const selectedPatternValue = passwordPatternSelect.value;
        const pattern = operacoesPatterns.find(p => p.id == selectedPatternValue);

        if (pattern) {
            return generateGenericPassword(pattern);
        } else {
            return "Selecione um padrão";
        }
    };

    // --- Lógica de Cópia (Mantida) ---

    const copyPassword = async () => {
        if (passwordOutput.value) {
            try {
                await navigator.clipboard.writeText(passwordOutput.value);
                
                const copyAlert = document.getElementById('copyAlert');
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

    // --- Event Listeners e Inicialização (Mantidos) ---
    
    passwordPatternSelect.addEventListener('change', saveCurrentPattern);

    generateButton.addEventListener('click', () => {
        saveCurrentPattern(); 
        passwordOutput.value = generatePassword();
    });

    copyButton.addEventListener('click', copyPassword);

    passwordOutput.value = ''; 
    loadPatternsFromSupabase();
});