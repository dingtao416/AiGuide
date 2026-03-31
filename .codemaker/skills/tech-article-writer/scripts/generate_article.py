#!/usr/bin/env python3
"""
智能技术文章生成器

基于主题和需求自动生成技术文章，支持多种模板和风格。

使用方法：
    python generate_article.py --topic "Spec Coding" --type "concept" --style "dialogue"
    python generate_article.py --topic "Vue.js教程" --type "tutorial" --length "long"
"""

import argparse
import os
import json
from datetime import datetime
from pathlib import Path


class ArticleGenerator:
    """技术文章生成器"""
    
    def __init__(self):
        self.templates = {
            'tutorial': self._get_tutorial_template(),
            'concept': self._get_concept_template(),
            'comparison': self._get_comparison_template(),
            'case_study': self._get_case_study_template(),
            'problem_solving': self._get_problem_solving_template()
        }
        
        self.styles = {
            'dialogue': '对话式风格（AI导师与开发者互动）',
            'formal': '正式文档风格（严谨专业）',
            'popular': '科普解释风格（通俗易懂）',
            'deep': '深度分析风格（技术深入）',
            'news': '新闻报道风格（客观描述）'
        }
    
    def _get_tutorial_template(self):
        """获取教程型模板"""
        return {
            'sections': [
                '对话式开篇',
                '前置知识',
                '环境搭建', 
                '基础实现',
                '功能扩展',
                '实战项目',
                '进阶技巧',
                '总结与下一步'
            ],
            'features': ['代码示例', '实操步骤', '环境配置', '最佳实践']
        }
    
    def _get_concept_template(self):
        """获取概念型模板"""
        return {
            'sections': [
                '对话式引入',
                '问题背景', 
                '概念定义',
                '工作原理',
                '应用场景',
                '实践理解',
                '深入思考',
                '总结'
            ],
            'features': ['生活化类比', '原理解析', '应用案例', '深度思考']
        }
    
    def _get_comparison_template(self):
        """获取对比型模板"""
        return {
            'sections': [
                '对话式开篇',
                '背景介绍',
                '核心特性对比',
                '使用场景分析', 
                '实战对比',
                '选择建议',
                '总结'
            ],
            'features': ['对比表格', '场景分析', '实战测试', '选择建议']
        }
    
    def _get_case_study_template(self):
        """获取案例型模板"""
        return {
            'sections': [
                '背景故事',
                '问题分析',
                '方案设计',
                '实施过程',
                '结果评估',
                '经验总结', 
                '推广价值'
            ],
            'features': ['真实案例', '问题分析', '解决方案', '经验分享']
        }
    
    def _get_problem_solving_template(self):
        """获取问题解决型模板"""
        return {
            'sections': [
                '问题描述',
                '问题分析',
                '解决思路',
                '具体方案',
                '实现代码',
                '测试验证',
                '扩展思考'
            ],
            'features': ['问题定位', '解决方案', '完整代码', '验证方法']
        }
    
    def analyze_topic(self, topic):
        """分析主题，推荐最佳模板和风格"""
        topic_lower = topic.lower()
        
        # 根据主题关键词推荐模板类型
        if any(keyword in topic_lower for keyword in ['教程', 'tutorial', '学习', '入门']):
            recommended_type = 'tutorial'
        elif any(keyword in topic_lower for keyword in ['是什么', 'what is', '理解', '概念']):
            recommended_type = 'concept'
        elif any(keyword in topic_lower for keyword in ['vs', '对比', '比较', '选择']):
            recommended_type = 'comparison'
        elif any(keyword in topic_lower for keyword in ['实战', '案例', '项目', '开发']):
            recommended_type = 'case_study'
        elif any(keyword in topic_lower for keyword in ['问题', 'error', '解决', '报错']):
            recommended_type = 'problem_solving'
        else:
            recommended_type = 'concept'  # 默认概念型
        
        # 根据主题复杂度推荐风格
        if any(keyword in topic_lower for keyword in ['深入', '原理', '底层', '高级']):
            recommended_style = 'deep'
        elif any(keyword in topic_lower for keyword in ['入门', '初学', '基础', '什么是']):
            recommended_style = 'popular'
        else:
            recommended_style = 'dialogue'  # 默认对话式
        
        return recommended_type, recommended_style
    
    def generate_outline(self, topic, article_type, style, length):
        """生成文章大纲"""
        template = self.templates.get(article_type, self.templates['concept'])
        
        outline = {
            'title': self._generate_title(topic, article_type),
            'type': article_type,
            'style': style,
            'length': length,
            'sections': template['sections'],
            'features': template['features'],
            'estimated_words': self._estimate_word_count(length),
            'target_audience': self._determine_audience(topic, style),
            'generated_at': datetime.now().isoformat()
        }
        
        return outline
    
    def _generate_title(self, topic, article_type):
        """生成文章标题"""
        if article_type == 'tutorial':
            return f"{topic} 完整教程"
        elif article_type == 'concept':
            return f"深入理解 {topic}"
        elif article_type == 'comparison':
            return f"{topic} 技术对比与选择"
        elif article_type == 'case_study':
            return f"从0到1：{topic} 实战案例"
        elif article_type == 'problem_solving':
            return f"{topic} 问题解决指南"
        else:
            return topic
    
    def _estimate_word_count(self, length):
        """估算字数"""
        word_counts = {
            'short': 1500,
            'medium': 3000,
            'long': 5000
        }
        return word_counts.get(length, 3000)
    
    def _determine_audience(self, topic, style):
        """确定目标读者"""
        if style == 'popular':
            return "技术初学者"
        elif style == 'deep':
            return "有经验的开发者"
        elif style == 'formal':
            return "技术团队和文档读者"
        else:
            return "广泛的技术受众"
    
    def create_writing_prompt(self, outline):
        """创建写作提示词"""
        prompt = f"""
请基于以下大纲创作一篇高质量的技术文章：

## 文章信息
- 标题：{outline['title']}
- 类型：{outline['type']} ({self.templates[outline['type']]['features']})
- 风格：{outline['style']} ({self.styles[outline['style']]})
- 目标读者：{outline['target_audience']}
- 预期字数：{outline['estimated_words']}字

## 文章结构
{chr(10).join([f"- {section}" for section in outline['sections']])}

## 内容要求
1. **技术准确性**：确保所有技术概念和代码示例准确无误
2. **实用性**：提供可操作的步骤和实际应用案例
3. **可读性**：语言通俗易懂，逻辑结构清晰
4. **完整性**：包含代码示例、应用场景、最佳实践

## 风格特点
- 使用生动的例子和类比
- 预判读者可能的疑问并解答
- 适当使用技术幽默（如果是对话式风格）
- 重点信息用**加粗**或`代码格式`突出

请开始创作这篇文章。
        """
        return prompt.strip()
    
    def save_article(self, content, filename):
        """保存文章到文件"""
        output_path = Path(filename)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return output_path


def main():
    parser = argparse.ArgumentParser(description='智能技术文章生成器')
    parser.add_argument('--topic', required=True, help='文章主题')
    parser.add_argument('--type', choices=['tutorial', 'concept', 'comparison', 'case_study', 'problem_solving'], 
                       help='文章类型（不指定则自动推荐）')
    parser.add_argument('--style', choices=['dialogue', 'formal', 'popular', 'deep', 'news'], 
                       help='写作风格（不指定则自动推荐）')
    parser.add_argument('--length', choices=['short', 'medium', 'long'], default='medium', 
                       help='文章长度')
    parser.add_argument('--output', help='输出文件路径')
    parser.add_argument('--outline-only', action='store_true', help='仅生成大纲不生成文章')
    
    args = parser.parse_args()
    
    generator = ArticleGenerator()
    
    # 分析主题，获取推荐的类型和风格
    recommended_type, recommended_style = generator.analyze_topic(args.topic)
    
    # 使用用户指定的参数，如果没有则使用推荐的
    article_type = args.type or recommended_type
    style = args.style or recommended_style
    
    print(f"? 开始生成文章...")
    print(f"? 主题: {args.topic}")
    print(f"? 类型: {article_type}")
    print(f"? 风格: {style}")
    print(f"? 长度: {args.length}")
    
    # 生成大纲
    outline = generator.generate_outline(args.topic, article_type, style, args.length)
    
    print(f"\n? 文章大纲:")
    print(f"标题: {outline['title']}")
    print(f"目标读者: {outline['target_audience']}")
    print(f"预计字数: {outline['estimated_words']}")
    print(f"主要特点: {', '.join(outline['features'])}")
    print(f"文章结构: {' → '.join(outline['sections'])}")
    
    if args.outline_only:
        # 保存大纲
        outline_filename = args.output or f"{args.topic.replace(' ', '_')}_outline.json"
        with open(outline_filename, 'w', encoding='utf-8') as f:
            json.dump(outline, f, ensure_ascii=False, indent=2)
        print(f"\n? 大纲已保存到: {outline_filename}")
        return
    
    # 生成写作提示词
    prompt = generator.create_writing_prompt(outline)
    
    print(f"\n? AI 写作提示词已生成，可以复制以下内容给AI助手：")
    print("=" * 50)
    print(prompt)
    print("=" * 50)
    
    # 如果指定了输出文件，保存提示词
    if args.output:
        prompt_filename = args.output.replace('.md', '_prompt.txt')
        with open(prompt_filename, 'w', encoding='utf-8') as f:
            f.write(prompt)
        print(f"\n? 写作提示词已保存到: {prompt_filename}")


if __name__ == "__main__":
    main()