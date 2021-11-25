#include "pch.h"
#include "CDrawCircle.h"
#include <math.h>




void CDrawCircle::drawCircleMidpoint(CDC* pDC, int xc, int yc, int r, COLORREF color)
{
    int x = 0, y = r;
    int f = 1 - r;

    pDC->SetPixel(x + xc, y + yc, color);
    pDC->SetPixel(-x + xc, y + yc, color);
    pDC->SetPixel(x + xc, -y + yc, color);
    pDC->SetPixel(-x + xc, -y + yc, color);
    pDC->SetPixel(y + xc, x + yc, color);
    pDC->SetPixel(-y + xc, x + yc, color);
    pDC->SetPixel(y + xc, -x + yc, color);
    pDC->SetPixel(-y + xc, -x + yc, color);

    while (x < y)
    {
        if (f < 0) f += (x << 1) + 3;
        else
        {
            y--;
            f += ((x - y) << 1) + 5;
        }
        x++;
        pDC->SetPixel(x + xc, y + yc, color);
        pDC->SetPixel(-x + xc, y + yc, color);
        pDC->SetPixel(x + xc, -y + yc, color);
        pDC->SetPixel(-x + xc, -y + yc, color);
        pDC->SetPixel(y + xc, x + yc, color);
        pDC->SetPixel(-y + xc, x + yc, color);
        pDC->SetPixel(y + xc, -x + yc, color);
        pDC->SetPixel(-y + xc, -x + yc, color);
    }

}
