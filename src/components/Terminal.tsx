import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
    command: string;
    output: React.ReactNode;
}

export const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Command[]>([
        { command: 'welcome', output: 'Welcome to AppforgeX Terminal v1.0.0. Type "help" for available commands.' }
    ]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Keyboard shortcut to toggle terminal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === '`') {
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (trimmedCmd) {
            case 'help':
                output = (
                    <div className="space-y-1">
                        <p>Available commands:</p>
                        <ul className="list-disc list-inside pl-2">
                            <li><span className="text-primary font-bold">about</span> - Learn more about us</li>
                            <li><span className="text-primary font-bold">projects</span> - View our portfolio</li>
                            <li><span className="text-primary font-bold">contact</span> - Get in touch</li>
                            <li><span className="text-primary font-bold">clear</span> - Clear terminal history</li>
                            <li><span className="text-primary font-bold">theme</span> - Toggle light/dark mode (coming soon)</li>
                            <li><span className="text-primary font-bold">help</span> - Show this help message</li>
                        </ul>
                    </div>
                );
                break;
            case 'about':
                output = "AppforgeX is a premium digital agency focused on building high-performance web applications.";
                break;
            case 'projects':
                output = (
                    <div className="space-y-1">
                        <p>Recent Projects:</p>
                        <ul className="list-disc list-inside pl-2">
                            <li>E-Commerce Platform</li>
                            <li>SaaS Dashboard</li>
                            <li>Portfolio Website</li>
                        </ul>
                        <p className="text-xs text-muted-foreground mt-2">Type "open [project_name]" to view details (simulation).</p>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div>
                        <p>Email: hello@appforgex.com</p>
                        <p>Twitter: @appforgex</p>
                        <p>GitHub: github.com/appforgex</p>
                    </div>
                );
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'theme':
                output = "Theme toggling is currently controlled by system settings or the main UI toggle.";
                break;
            case '':
                output = '';
                break;
            default:
                output = <span className="text-red-400">Command not found: {trimmedCmd}. Type "help" for a list of commands.</span>;
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;
        handleCommand(input);
        setInput('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            // Simple history navigation logic could go here
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:bg-black/60 hover:border-primary/50"
                aria-label="Open Terminal"
            >
                <div className="relative">
                    <TerminalIcon size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                <span className="text-sm font-medium tracking-wide hidden md:inline-block text-gray-200 group-hover:text-white">
                    CMD / TERMINAL
                </span>
                <span className="ml-1 text-xs text-muted-foreground bg-white/10 px-1.5 py-0.5 rounded border border-white/5 hidden md:inline-block">
                    Ctrl + `
                </span>
            </button>
        );
    }

    return (
        <div className={cn(
            "fixed z-50 bg-black/90 text-green-400 font-mono shadow-2xl border border-green-500/30 backdrop-blur-md transition-all duration-300 flex flex-col",
            isMaximized ? "inset-0 rounded-none" : "bottom-4 right-4 w-[90vw] h-[60vh] md:w-[600px] md:h-[400px] rounded-lg"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-green-900/20 border-b border-green-500/30 rounded-t-lg">
                <div className="flex items-center gap-2">
                    <TerminalIcon size={16} />
                    <span className="text-sm font-bold">AppforgeX Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-green-500/20 rounded">
                        {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-red-500/20 hover:text-red-400 rounded">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-green-500/30 scrollbar-track-transparent" onClick={() => inputRef.current?.focus()}>
                {history.map((entry, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex items-center gap-2 text-green-500/80">
                            <span>➜</span>
                            <span>~</span>
                            <span className="text-white">{entry.command}</span>
                        </div>
                        <div className="pl-6 text-green-300/90 whitespace-pre-wrap">
                            {entry.output}
                        </div>
                    </div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                    <span className="text-green-500">➜</span>
                    <span className="text-green-500">~</span>
                    <form onSubmit={handleSubmit} className="flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent border-none outline-none text-white placeholder-green-500/30"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </form>
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
