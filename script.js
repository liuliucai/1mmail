// ===== 移动端菜单切换 =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 点击导航链接后关闭菜单
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// ===== FAQ 折叠展开 =====
function toggleFaq(element) {
    element.classList.toggle('active');
}

// ===== 注册表单处理 =====
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const domain = document.getElementById('domain').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const phone = document.getElementById('phone').value.trim();
    const agree = document.getElementById('agree').checked;

    // 验证用户名
    if (!username) {
        showToast('请输入用户名', 'error');
        return;
    }

    if (username.length < 3) {
        showToast('用户名至少需要3个字符', 'error');
        return;
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        showToast('用户名只能包含字母、数字、点和下划线', 'error');
        return;
    }

    // 验证密码
    if (!password) {
        showToast('请设置密码', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('密码至少需要6个字符', 'error');
        return;
    }

    // 验证确认密码
    if (password !== confirm) {
        showToast('两次输入的密码不一致', 'error');
        return;
    }

    // 验证同意条款
    if (!agree) {
        showToast('请阅读并同意服务条款和隐私政策', 'error');
        return;
    }

    // 验证手机号（如果填写）
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
        showToast('请输入正确的手机号格式', 'error');
        return;
    }

    // 构建邮箱地址
    const email = username + domain;

    // 模拟注册成功
    showToast(`🎉 注册成功！你的邮箱是：${email}`, 'success');

    // 清空表单
    document.getElementById('registerForm').reset();

    // 3秒后滚动到顶部
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
}

// ===== Toast 通知 =====
function showToast(message, type = 'success') {
    // 移除已有的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 触发动画
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // 3秒后自动消失
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3000);
}

// ===== 滚动动画 =====
// 使用 Intersection Observer 实现滚动进入视口时的动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .faq-item, .register-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== 导航栏滚动效果 =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
        navbar.style.borderBottomColor = 'rgba(108, 99, 255, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.8)';
        navbar.style.borderBottomColor = 'rgba(42, 42, 74, 0.5)';
    }

    lastScroll = currentScroll;
});

// ===== 键盘快捷键 =====
document.addEventListener('keydown', (e) => {
    // Escape 关闭移动端菜单
    if (e.key === 'Escape') {
        document.querySelector('.nav-links').classList.remove('active');
    }
});

// ===== 控制台彩蛋 =====
console.log('%c✉ 1mmail - 百万邮箱', 'font-size: 24px; font-weight: bold; color: #6C63FF;');
console.log('%c欢迎来到百万邮箱！', 'font-size: 16px; color: #b0b0d0;');
console.log('%c如果你看到了这条消息，说明你是个有品位的开发者 😎', 'font-size: 14px; color: #6b6b8d;');
