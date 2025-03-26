// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // THORChain Liquidity Calculator
    const calculateLiquidity = document.getElementById('calculate-liquidity');
    if (calculateLiquidity) {
        calculateLiquidity.addEventListener('click', () => {
            const initialAmount = parseFloat(document.getElementById('liquidity-amount').value);
            const apr = parseFloat(document.getElementById('liquidity-apr').value);
            const daysHeld = parseFloat(document.getElementById('liquidity-period').value);
            const swapFee = parseFloat(document.getElementById('liquidity-fee').value);
            
            // Validate inputs
            if (isNaN(initialAmount) || isNaN(apr) || isNaN(daysHeld) || isNaN(swapFee)) {
                alert('Please enter valid numbers for all fields');
                return;
            }
            
            // Calculate daily rate (APR / 365)
            const dailyRate = apr / 100 / 365;
            
            // Calculate swap fee daily income (this is a simplified model)
            const swapFeeDailyRate = swapFee / 100 / 365 * 2; // Assuming 2x daily volume of pool size
            
            // Calculate total return
            const totalRate = dailyRate + swapFeeDailyRate;
            const totalValue = initialAmount * Math.pow(1 + totalRate, daysHeld);
            const profit = totalValue - initialAmount;
            const roi = (profit / initialAmount) * 100;
            
            // Update results
            document.getElementById('liquidity-total').textContent = `$${totalValue.toFixed(2)}`;
            document.getElementById('liquidity-profit').textContent = `$${profit.toFixed(2)}`;
            document.getElementById('liquidity-roi').textContent = `${roi.toFixed(2)}%`;
        });
    }
    
    // tBTC Staking Calculator
    const calculateStaking = document.getElementById('calculate-staking');
    if (calculateStaking) {
        calculateStaking.addEventListener('click', () => {
            const btcAmount = parseFloat(document.getElementById('staking-amount').value);
            const stakingApr = parseFloat(document.getElementById('staking-apr').value);
            const stakingDays = parseFloat(document.getElementById('staking-period').value);
            const btcPrice = parseFloat(document.getElementById('btc-price').value);
            
            // Validate inputs
            if (isNaN(btcAmount) || isNaN(stakingApr) || isNaN(stakingDays) || isNaN(btcPrice)) {
                alert('Please enter valid numbers for all fields');
                return;
            }
            
            // Calculate daily rate
            const dailyRate = stakingApr / 100 / 365;
            
            // Calculate total BTC after staking period
            const totalBtc = btcAmount * Math.pow(1 + dailyRate, stakingDays);
            const profit = totalBtc - btcAmount;
            
            // Calculate USD values
            const totalUsd = totalBtc * btcPrice;
            const profitUsd = profit * btcPrice;
            
            // Update results
            document.getElementById('staking-total-btc').textContent = `${totalBtc.toFixed(8)} BTC`;
            document.getElementById('staking-total-usd').textContent = `$${totalUsd.toFixed(2)}`;
            document.getElementById('staking-profit').textContent = `$${profitUsd.toFixed(2)}`;
        });
    }
    
    // Compound Interest Calculator
    const calculateCompound = document.getElementById('calculate-compound');
    if (calculateCompound) {
        calculateCompound.addEventListener('click', () => {
            const principal = parseFloat(document.getElementById('compound-principal').value);
            const rate = parseFloat(document.getElementById('compound-rate').value);
            const time = parseFloat(document.getElementById('compound-time').value);
            const frequency = parseFloat(document.getElementById('compound-frequency').value);
            
            // Validate inputs
            if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(frequency)) {
                alert('Please enter valid numbers for all fields');
                return;
            }
            
            // Calculate compound interest
            // A = P(1 + r/n)^(nt)
            const r = rate / 100;
            const n = frequency;
            const t = time;
            
            const futureValue = principal * Math.pow(1 + (r / n), n * t);
            const interestEarned = futureValue - principal;
            const growthPercentage = (interestEarned / principal) * 100;
            
            // Update results
            document.getElementById('compound-future').textContent = `${futureValue.toFixed(2)}`;
            document.getElementById('compound-interest').textContent = `${interestEarned.toFixed(2)}`;
            document.getElementById('compound-growth').textContent = `${growthPercentage.toFixed(2)}%`;
        });
    }
    
    // Analytics tracking (simple implementation)
    function trackOutboundLink(url) {
        // This is a placeholder for actual analytics tracking
        console.log('Outbound link clicked:', url);
        
        // You could implement actual tracking here with Google Analytics or similar
        // gtag('event', 'click', {
        //   'event_category': 'outbound',
        //   'event_label': url,
        //   'transport_type': 'beacon'
        // });
        
        return true;
    }
    
    // Add tracking to all outbound links to rebase.foundation
    const outboundLinks = document.querySelectorAll('a[href^="https://rebase.foundation"]');
    outboundLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackOutboundLink(this.href);
        });
    });
    
    // Calculate button animation
    const calculateButtons = document.querySelectorAll('.calculate-button');
    calculateButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    });
    
    // Initialize with default calculations
    if (calculateLiquidity) calculateLiquidity.click();
    if (calculateStaking) calculateStaking.click();
    if (calculateCompound) calculateCompound.click();
});
