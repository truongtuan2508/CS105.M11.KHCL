#pragma once
class CLine
{
public:
	static void LindDDA(CDC* pDC, CPoint A, CPoint B, COLORREF color);
	static void LindBresenham(CDC* pDC, CPoint A, CPoint B, COLORREF color);

	static void LineDDA(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);
	static void LineBresenham(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);

private:
	static void _LineDDA1(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);
	static void _LineDDA2(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);

	static void _LineBresenham1(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);
	static void _LineBresenham2(CDC* pDC, int x1, int x2, int y1, int y2, COLORREF color);

};

