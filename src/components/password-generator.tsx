"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // 确保至少选择了一种字符类型
    if (charset === "") {
      setIncludeLowercase(true);
      charset = "abcdefghijklmnopqrstuvwxyz";
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    // 显示复制成功的提示
    toast.success("密码已复制到剪贴板", {
      description: "现在可以粘贴到需要的地方",
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  // 组件加载时生成密码
  useEffect(() => {
    generatePassword();
  }, []);

  // 当选项改变时重新生成密码
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>密码生成器</CardTitle>
        <CardDescription>生成安全、随机的密码</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Input 
            value={password} 
            readOnly 
            className="font-mono text-lg"
          />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={copyToClipboard}
            title={copied ? "已复制!" : "复制密码"}
          >
            <Copy className={copied ? "text-green-500" : ""} size={18} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={generatePassword}
            title="生成新密码"
          >
            <RefreshCw size={18} />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>密码长度: {length[0]}</span>
          </div>
          <Slider
            value={length}
            min={6}
            max={30}
            step={1}
            onValueChange={setLength}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">包含字符:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uppercase" 
                checked={includeUppercase} 
                onCheckedChange={(checked) => setIncludeUppercase(checked === true)} 
              />
              <label htmlFor="uppercase" className="text-sm">大写字母 (A-Z)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lowercase" 
                checked={includeLowercase} 
                onCheckedChange={(checked) => setIncludeLowercase(checked === true)} 
              />
              <label htmlFor="lowercase" className="text-sm">小写字母 (a-z)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="numbers" 
                checked={includeNumbers} 
                onCheckedChange={(checked) => setIncludeNumbers(checked === true)} 
              />
              <label htmlFor="numbers" className="text-sm">数字 (0-9)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="symbols" 
                checked={includeSymbols} 
                onCheckedChange={(checked) => setIncludeSymbols(checked === true)} 
              />
              <label htmlFor="symbols" className="text-sm">特殊符号 (!@#$%^&*)</label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generatePassword} className="w-full">
          生成新密码
        </Button>
      </CardFooter>
    </Card>
  );
} 