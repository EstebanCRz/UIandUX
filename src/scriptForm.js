document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#d35400', '#c0392b'];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function applyNewDesign() {
        document.body.style.backgroundColor = getRandomColor();

        // Reset form background color and translate labels
        const form = document.querySelector('form');
        form.style.backgroundColor = '#fff';
        translateLabels();

        document.querySelector('button').style.backgroundColor = getRandomColor();
    }

    function translateLabels() {
        const language = getRandomLanguage();

        const translations = {
            // ... (autres traductions)
            'nomLabel': {
                'en': 'Name:',
                'fr': 'Nom :',
                'zh': '姓名：',
                'ja': '名前：',
                'ru': 'Имя:',
            },
            'prenomLabel': {
                'en': 'First Name:',
                'fr': 'Prénom :',
                'zh': '名字：',
                'ja': '名：',
                'ru': 'Имя:',
            },
            'emailLabel': {
                'en': 'Email:',
                'fr': 'Email :',
                'zh': '电子邮件：',
                'ja': 'メール：',
                'ru': 'Электронная почта:',
            },
            'messageLabel': {
                'en': 'Message:',
                'fr': 'Message :',
                'zh': '留言：',
                'ja': 'メッセージ：',
                'ru': 'Сообщение:',
            },
            'submitButtonText': {
                'en': 'Submit',
                'fr': 'Envoyer',
                'zh': '提交',
                'ja': '送信',
                'ru': 'Отправить',
            },
            'cancelButtonText': {
                'en': 'Cancel',
                'fr': 'Annuler',
                'zh': '取消',
                'ja': 'キャンセル',
                'ru': 'Отмена',
            },
        };

        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const key = element.getAttribute('data-i18n');
            const translation = translations[key] && translations[key][language];
            if (translation) {
                element.innerText = translation;
            }
        });
    }

    function getRandomLanguage() {
        const languages = ['en', 'fr', 'zh', 'ja', 'ru']; // Ajoutez toutes les langues disponibles
        return languages[Math.floor(Math.random() * languages.length)];
    }

    applyNewDesign();

    window.addEventListener('beforeunload', function () {
        applyNewDesign();
    });
});
