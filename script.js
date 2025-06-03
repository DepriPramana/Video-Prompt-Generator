// script.js content

        // Ambil elemen-elemen DOM
        const subjectEl = document.getElementById('subject');
        const actionEl = document.getElementById('action');
        const expressionEl = document.getElementById('expression');
        const placeEl = document.getElementById('place');
        const timeEl = document.getElementById('time');
        const cameraMovementEl = document.getElementById('cameraMovement');
        const lightingEl = document.getElementById('lighting');
        const videoStyleEl = document.getElementById('videoStyle');
        const atmosphereEl = document.getElementById('atmosphere');
        const soundMusicEl = document.getElementById('soundMusic');
        const spokenTextEl = document.getElementById('spokenText');
        const additionalDetailsEl = document.getElementById('additionalDetails');

        const promptOutputIndonesiaEl = document.getElementById('promptOutputIndonesia');
        const promptOutputEnglishEl = document.getElementById('promptOutputEnglish');
        const enhancedPromptOutputIndonesiaEl = document.getElementById('enhancedPromptOutputIndonesia'); 
        const enhancedPromptOutputEnglishEl = document.getElementById('enhancedPromptOutputEnglish'); 


        const btnGenerateTranslate = document.getElementById('btnGenerateTranslate');
        const btnReset = document.getElementById('btnReset');
        const btnCopyAll = document.getElementById('btnCopyAll');
        const btnExport = document.getElementById('btnExport');
        const btnCopyIndonesia = document.getElementById('btnCopyIndonesia');
        const btnCopyEnglish = document.getElementById('btnCopyEnglish');
        const btnCopyEnhancedIndonesia = document.getElementById('btnCopyEnhancedIndonesia'); 
        const btnCopyEnhancedEnglish = document.getElementById('btnCopyEnhancedEnglish'); 


        const btnSuggest = document.getElementById('btnSuggest');
        const btnDevelopDetails = document.getElementById('btnDevelopDetails');
        const geminiThemeEl = document.getElementById('geminiTheme');
        const btnEnhancePrompt = document.getElementById('btnEnhancePrompt'); 

        const messageBox = document.getElementById('messageBox');
        const suggestLoader = document.getElementById('suggestLoader');
        const translateLoader = document.getElementById('translateLoader');
        const developLoader = document.getElementById('developLoader'); 
        const enhanceLoader = document.getElementById('enhanceLoader'); 

        const geminiApiKeyEl = document.getElementById('geminiApiKey');
        const geminiModelEl = document.getElementById('geminiModel');

        function showMessage(message, duration = 3000) {
            if (messageBox) {
                messageBox.textContent = message;
                messageBox.style.display = 'block';
                setTimeout(() => {
                    messageBox.style.display = 'none';
                }, duration);
            }
        }

        function generateIndonesianPrompt() {
            const parts = [];
            if (subjectEl && subjectEl.value) parts.push(subjectEl.value.trim());
            if (actionEl && actionEl.value) parts.push(actionEl.value.trim());
            if (expressionEl && expressionEl.value) parts.push(`dengan ekspresi ${expressionEl.value.trim()}`);
            if (placeEl && placeEl.value) parts.push(`di ${placeEl.value.trim()}`);
            if (timeEl && timeEl.value) parts.push(`pada ${timeEl.value}`);
            if (cameraMovementEl && cameraMovementEl.value) parts.push(`dengan gerakan kamera ${cameraMovementEl.value}`);
            if (lightingEl && lightingEl.value) parts.push(`menggunakan pencahayaan ${lightingEl.value}`);
            if (videoStyleEl && videoStyleEl.value) parts.push(`dalam gaya video ${videoStyleEl.value}`);
            if (atmosphereEl && atmosphereEl.value) parts.push(`menciptakan suasana ${atmosphereEl.value}`);
            if (soundMusicEl && soundMusicEl.value) parts.push(`diiringi ${soundMusicEl.value.trim()}`);
            if (spokenTextEl && spokenTextEl.value) parts.push(`dengan dialog: "${spokenTextEl.value.trim()}"`);
            if (additionalDetailsEl && additionalDetailsEl.value) parts.push(`detail tambahan: ${additionalDetailsEl.value.trim()}`);

            const prompt = parts.join(', ').replace(/, ,/g, ',').replace(/,$/g, '');
            
            if (promptOutputIndonesiaEl) {
                if (prompt) {
                    promptOutputIndonesiaEl.textContent = prompt + '.';
                } else {
                    promptOutputIndonesiaEl.textContent = "Silakan isi beberapa field untuk membuat prompt.";
                }
            }
            return prompt ? prompt + '.' : "";
        }

        async function callGeminiAPI(promptText, forTranslation = false, forEnhancement = false, forSuggestion = false) {
            const userApiKey = geminiApiKeyEl ? geminiApiKeyEl.value.trim() : "";
            const selectedModel = geminiModelEl ? geminiModelEl.value : "gemini-2.0-flash"; 

            if (!userApiKey && (typeof __GEMINI_API_KEY__ === 'undefined' || !__GEMINI_API_KEY__)) { 
                showMessage("Silakan masukkan API Key Gemini Anda di bagian Pengaturan.", 4000);
                if (suggestLoader) suggestLoader.style.display = 'none';
                if (translateLoader) translateLoader.style.display = 'none';
                if (developLoader) developLoader.style.display = 'none';
                if (enhanceLoader) enhanceLoader.style.display = 'none';
                if (btnSuggest) btnSuggest.disabled = false;
                if (btnGenerateTranslate) btnGenerateTranslate.disabled = false;
                if (btnDevelopDetails) btnDevelopDetails.disabled = false;
                if (btnEnhancePrompt) btnEnhancePrompt.disabled = false;
                return null;
            }
            
            const apiKey = userApiKey || (typeof __GEMINI_API_KEY__ !== 'undefined' ? __GEMINI_API_KEY__ : "");
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
            
            let userPromptText = promptText;

            if (forTranslation) {
                 userPromptText = `Translate the following Indonesian text to English: "${promptText}"`;
            } else if (forEnhancement) {
                userPromptText = `Tingkatkan dan buat lebih detail serta kreatif prompt video berikut ini dalam Bahasa Indonesia. Fokus pada penambahan detail visual, suasana, atau narasi yang lebih kaya. Jangan mengubah elemen inti yang sudah ada kecuali untuk membuatnya lebih baik. Prompt asli: "${promptText}"`;
            } else if (forSuggestion) {
                // User prompt text for suggestion is already formatted in the event listener
            }


            const payload = {
                contents: [{ role: "user", parts: [{ text: userPromptText }] }]
            };
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Gemini API Error:", errorData);
                    let errorMessage = `API request failed with status ${response.status}`;
                    if (errorData.error && errorData.error.message) {
                        errorMessage += `: ${errorData.error.message}`;
                    }
                    if (response.status === 400 && errorData.error?.message.includes("API key not valid")) {
                        errorMessage = "API Key tidak valid. Periksa kembali API Key Anda.";
                    } else if (response.status === 403) {
                         errorMessage = "Akses ditolak. Pastikan API Key Anda memiliki izin yang benar untuk model ini.";
                    } else if (response.status === 429) {
                        errorMessage = "Terlalu banyak permintaan. Silakan coba lagi nanti.";
                    }
                    throw new Error(errorMessage);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    console.error("Unexpected API response structure:", result);
                    if (result.promptFeedback && result.promptFeedback.blockReason) {
                         throw new Error(`Gagal mendapatkan konten: Permintaan diblokir karena ${result.promptFeedback.blockReason}.`);
                    }
                    throw new Error("Gagal mendapatkan konten dari respons API atau respons kosong.");
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error);
                showMessage(`Error: ${error.message}`, 5000);
                return null;
            }
        }

        async function translatePromptWithGemini(indonesianPrompt, targetOutputEl) {
            if (targetOutputEl) {
                 if (!indonesianPrompt || indonesianPrompt.includes("Silakan isi beberapa field") || indonesianPrompt.includes("akan muncul di sini") || indonesianPrompt.includes("Hasil peningkatan prompt akan muncul di sini...")) {
                     targetOutputEl.textContent = "Prompt Bahasa Indonesia belum tersedia atau valid untuk diterjemahkan.";
                     return;
                }
                targetOutputEl.textContent = "Menerjemahkan...";
            }
            
            let currentLoader = null;
            let currentButton = null;

            if (targetOutputEl === promptOutputEnglishEl) {
                currentLoader = translateLoader;
                currentButton = btnGenerateTranslate;
            } else if (targetOutputEl === enhancedPromptOutputEnglishEl) {
                // For enhanced translation, we might not have a dedicated loader/button if it's part of the enhance flow
                // However, if we want to show a loader on the "enhance" button itself during this translation step:
                currentLoader = enhanceLoader; 
            }


            if(currentLoader) currentLoader.style.display = 'inline-block';
            if(currentButton) currentButton.disabled = true;

            const translatedText = await callGeminiAPI(indonesianPrompt, true, false, false);

            if(currentLoader) currentLoader.style.display = 'none';
            if(currentButton) currentButton.disabled = false;


            if (targetOutputEl) {
                if (translatedText) {
                    targetOutputEl.textContent = translatedText;
                } else {
                    targetOutputEl.textContent = "Gagal menerjemahkan. Periksa API Key atau coba lagi.";
                }
            }
        }

        if (btnGenerateTranslate) {
            btnGenerateTranslate.addEventListener('click', async () => {
                const indonesianPrompt = generateIndonesianPrompt(); 
                if (indonesianPrompt && !indonesianPrompt.includes("Silakan isi beberapa field")) {
                     await translatePromptWithGemini(indonesianPrompt, promptOutputEnglishEl);
                } else {
                    if(promptOutputEnglishEl) promptOutputEnglishEl.textContent = "Buat prompt Bahasa Indonesia terlebih dahulu.";
                    showMessage('Buat prompt Bahasa Indonesia terlebih dahulu.', 2000);
                }
            });
        }
        
        if (btnEnhancePrompt) {
            btnEnhancePrompt.addEventListener('click', async () => {
                const currentIndonesianPrompt = promptOutputIndonesiaEl ? promptOutputIndonesiaEl.textContent : "";
                if (!currentIndonesianPrompt || currentIndonesianPrompt.includes("akan muncul di sini") || currentIndonesianPrompt.includes("Silakan isi beberapa field")) {
                    showMessage('Buat prompt utama terlebih dahulu sebelum ditingkatkan.', 3000);
                    return;
                }

                showMessage('Meningkatkan prompt dengan Gemini...', 2000);
                if(enhanceLoader) enhanceLoader.style.display = 'inline-block';
                btnEnhancePrompt.disabled = true;

                const enhancedPromptText = await callGeminiAPI(currentIndonesianPrompt, false, true, false);

                // Loader for enhancement itself is handled here, translation loader will be handled by translatePromptWithGemini
                // if(enhanceLoader) enhanceLoader.style.display = 'none'; 
                // btnEnhancePrompt.disabled = false; // Re-enable after translation completes

                if (enhancedPromptText) {
                    if (enhancedPromptOutputIndonesiaEl) {
                        enhancedPromptOutputIndonesiaEl.textContent = enhancedPromptText;
                    }
                    showMessage('Prompt telah ditingkatkan! Menerjemahkan hasil...', 2500);
                    await translatePromptWithGemini(enhancedPromptText, enhancedPromptOutputEnglishEl);
                } else {
                    if (enhancedPromptOutputIndonesiaEl) enhancedPromptOutputIndonesiaEl.textContent = "Gagal meningkatkan prompt.";
                    if (enhancedPromptOutputEnglishEl) enhancedPromptOutputEnglishEl.textContent = "Peningkatan gagal, terjemahan tidak dilakukan.";
                }
                // Re-enable button after all operations (enhancement and its translation)
                if(enhanceLoader) enhanceLoader.style.display = 'none';
                btnEnhancePrompt.disabled = false;
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                const inputs = [subjectEl, actionEl, expressionEl, placeEl, soundMusicEl, spokenTextEl, additionalDetailsEl, geminiThemeEl];
                inputs.forEach(input => { if(input) input.value = ''; });
                const selects = [timeEl, cameraMovementEl, lightingEl, videoStyleEl, atmosphereEl];
                selects.forEach(select => { if(select) select.selectedIndex = 0; });
                
                if(promptOutputIndonesiaEl) promptOutputIndonesiaEl.textContent = "Prompt Bahasa Indonesia akan muncul di sini setelah mengisi form...";
                if(promptOutputEnglishEl) promptOutputEnglishEl.textContent = "Terjemahan prompt akan muncul di sini setelah klik 'Buat & Terjemahkan'.";
                if(enhancedPromptOutputIndonesiaEl) enhancedPromptOutputIndonesiaEl.textContent = "Hasil peningkatan prompt akan muncul di sini...";
                if(enhancedPromptOutputEnglishEl) enhancedPromptOutputEnglishEl.textContent = "Terjemahan prompt yang ditingkatkan akan muncul di sini...";
                showMessage('Semua input dan hasil prompt telah direset.', 2000);
            });
        }

        function copyToClipboard(text, message) {
            const placeholderTexts = [
                "akan muncul di sini", 
                "Please fill some fields", 
                "Menerjemahkan...", 
                "Prompt Indonesia telah diubah",
                "Hasil peningkatan prompt akan muncul di sini...",
                "Terjemahan prompt yang ditingkatkan akan muncul di sini...",
                "Prompt Bahasa Indonesia belum tersedia atau valid untuk diterjemahkan."
            ];
            if (!text || placeholderTexts.some(placeholder => text.includes(placeholder))) {
                showMessage('Tidak ada teks valid untuk disalin.', 2000);
                return;
            }
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showMessage(message, 2000);
            } catch (err) {
                showMessage('Gagal menyalin teks.', 2000);
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }

        if(btnCopyIndonesia) {
            btnCopyIndonesia.addEventListener('click', () => {
                if(promptOutputIndonesiaEl) copyToClipboard(promptOutputIndonesiaEl.textContent, 'Prompt Indonesia disalin!');
            });
        }

        if(btnCopyEnglish) {
            btnCopyEnglish.addEventListener('click', () => {
                if(promptOutputEnglishEl) copyToClipboard(promptOutputEnglishEl.textContent, 'Prompt English disalin!');
            });
        }

        if(btnCopyEnhancedIndonesia) {
            btnCopyEnhancedIndonesia.addEventListener('click', () => {
                if(enhancedPromptOutputIndonesiaEl) copyToClipboard(enhancedPromptOutputIndonesiaEl.textContent, 'Prompt Ditingkatkan (ID) disalin!');
            });
        }

        if(btnCopyEnhancedEnglish) {
            btnCopyEnhancedEnglish.addEventListener('click', () => {
                if(enhancedPromptOutputEnglishEl) copyToClipboard(enhancedPromptOutputEnglishEl.textContent, 'Prompt Ditingkatkan (EN) disalin!');
            });
        }
                
        if(btnCopyAll) {
            btnCopyAll.addEventListener('click', () => {
                const indoPrompt = promptOutputIndonesiaEl ? promptOutputIndonesiaEl.textContent : "";
                const engPrompt = promptOutputEnglishEl ? promptOutputEnglishEl.textContent : "";
                const enhancedIndoPrompt = enhancedPromptOutputIndonesiaEl ? enhancedPromptOutputIndonesiaEl.textContent : "";
                const enhancedEngPrompt = enhancedPromptOutputEnglishEl ? enhancedPromptOutputEnglishEl.textContent : "";

                let allPrompts = "";
                let hasContent = false;
                const placeholderTexts = [
                    "akan muncul di sini", "Silakan isi beberapa field", "Menerjemahkan...", 
                    "Prompt Indonesia telah diubah", "Hasil peningkatan prompt akan muncul di sini...",
                    "Terjemahan prompt yang ditingkatkan akan muncul di sini...",
                    "Prompt Bahasa Indonesia belum tersedia atau valid untuk diterjemahkan."
                ];

                function isValidPrompt(text) {
                    return text && !placeholderTexts.some(placeholder => text.includes(placeholder));
                }

                if (isValidPrompt(indoPrompt)) {
                    allPrompts += "Prompt Utama (Indonesia):\n" + indoPrompt + "\n\n";
                    hasContent = true;
                }
                if (isValidPrompt(engPrompt)) {
                     allPrompts += "Prompt Utama (English):\n" + engPrompt + "\n\n";
                     hasContent = true;
                }
                if (isValidPrompt(enhancedIndoPrompt)) {
                    allPrompts += "Prompt Ditingkatkan (Indonesia):\n" + enhancedIndoPrompt + "\n\n";
                    hasContent = true;
                }
                if (isValidPrompt(enhancedEngPrompt)) {
                     allPrompts += "Prompt Ditingkatkan (English):\n" + enhancedEngPrompt + "\n";
                     hasContent = true;
                }
                
                if (!hasContent) {
                    showMessage('Tidak ada prompt yang dihasilkan untuk disalin.', 2000);
                    return;
                }
                copyToClipboard(allPrompts.trim(), 'Semua prompt disalin!');
            });
        }

        if(btnExport) {
            btnExport.addEventListener('click', () => {
                const indoPrompt = promptOutputIndonesiaEl ? promptOutputIndonesiaEl.textContent : "";
                const engPrompt = promptOutputEnglishEl ? promptOutputEnglishEl.textContent : "";
                const enhancedIndoPrompt = enhancedPromptOutputIndonesiaEl ? enhancedPromptOutputIndonesiaEl.textContent : "";
                const enhancedEngPrompt = enhancedPromptOutputEnglishEl ? enhancedPromptOutputEnglishEl.textContent : "";

                let content = "Generated Prompts\n===================\n\n";
                let hasContent = false;
                const placeholderTexts = [
                    "akan muncul di sini", "Silakan isi beberapa field", "Menerjemahkan...", 
                    "Prompt Indonesia telah diubah", "Hasil peningkatan prompt akan muncul di sini...",
                    "Terjemahan prompt yang ditingkatkan akan muncul di sini...",
                    "Prompt Bahasa Indonesia belum tersedia atau valid untuk diterjemahkan."
                ];
                
                function isValidPrompt(text) {
                    return text && !placeholderTexts.some(placeholder => text.includes(placeholder));
                }

                if (isValidPrompt(indoPrompt)) {
                    content += "Prompt Utama (Indonesia):\n" + indoPrompt + "\n\n";
                    hasContent = true;
                }
                if (isValidPrompt(engPrompt)) {
                     content += "Prompt Utama (English):\n" + engPrompt + "\n\n";
                     hasContent = true;
                }
                if (isValidPrompt(enhancedIndoPrompt)) {
                    content += "Prompt Ditingkatkan (Indonesia):\n" + enhancedIndoPrompt + "\n\n";
                    hasContent = true;
                }
                if (isValidPrompt(enhancedEngPrompt)) {
                     content += "Prompt Ditingkatkan (English):\n" + enhancedEngPrompt + "\n";
                     hasContent = true;
                }


                if (!hasContent) {
                    showMessage('Tidak ada prompt yang dihasilkan untuk diekspor.', 2000);
                    return;
                }

                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'prompts.txt';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showMessage('Prompt diekspor sebagai prompts.txt!', 2000);
            });
        }

        if(btnSuggest) {
            btnSuggest.addEventListener('click', async () => {
                const theme = geminiThemeEl ? geminiThemeEl.value.trim() : "";
                if (!theme) {
                    showMessage('Masukkan tema untuk mendapatkan saran.', 3000);
                    return;
                }

                showMessage('Meminta saran dari Gemini...', 2000);
                if(suggestLoader) suggestLoader.style.display = 'inline-block';
                btnSuggest.disabled = true;

                const geminiUserPrompt = `Berikan saran untuk prompt video dengan tema "${theme}". Fokus pada:
1.  Satu ide untuk Subjek (Subject)
2.  Satu ide untuk Aksi (Action) yang dilakukan subjek
3.  Satu ide untuk Ekspresi (Expression) subjek
4.  Satu ide untuk Tempat (Place) yang relevan
5.  Satu ide untuk Suara/Musik (Sound/Music) yang mendukung suasana

Format jawaban sebagai JSON seperti ini:
{
  "subject": "saran subjek di sini",
  "action": "saran aksi di sini",
  "expression": "saran ekspresi di sini",
  "place": "saran tempat di sini",
  "soundMusic": "saran suara/musik di sini"
}

Pastikan jawabannya hanya JSON tersebut. Jangan tambahkan penjelasan atau teks lain di luar JSON.`;

                const suggestionText = await callGeminiAPI(geminiUserPrompt, false, false, true); // Added forSuggestion flag
                if(suggestLoader) suggestLoader.style.display = 'none';
                btnSuggest.disabled = false;

                if (suggestionText) {
                    try {
                        const cleanedJsonString = suggestionText.replace(/```json\n?/g, '').replace(/\n?```/g, '').trim();
                        const suggestions = JSON.parse(cleanedJsonString);
                        
                        if (suggestions.subject && subjectEl) subjectEl.value = suggestions.subject;
                        if (suggestions.action && actionEl) actionEl.value = suggestions.action;
                        if (suggestions.expression && expressionEl) expressionEl.value = suggestions.expression;
                        if (suggestions.place && placeEl) placeEl.value = suggestions.place; // Populate Place
                        if (suggestions.soundMusic && soundMusicEl) soundMusicEl.value = suggestions.soundMusic; // Populate Sound/Music
                        showMessage('Saran lengkap telah diterapkan!', 2500);
                    } catch (e) {
                        console.error("Error parsing suggestion JSON:", e, "Raw text:", suggestionText);
                        if(subjectEl) subjectEl.value = `Saran dari Gemini (gagal parse): ${suggestionText.substring(0, 100)}...`; 
                        showMessage('Mendapatkan saran, tetapi formatnya tidak terduga. Lihat field subjek.', 4000);
                    }
                }
            });
        }

        if(btnDevelopDetails) {
            btnDevelopDetails.addEventListener('click', () => {
                if(developLoader) developLoader.style.display = 'inline-block'; 
                showMessage('Pengembangan detail tambahan dari Prompt ID akan diimplementasikan di sini (fitur placeholder).', 3000);
                setTimeout(() => { if(developLoader) developLoader.style.display = 'none'; }, 1500);
            });
        }