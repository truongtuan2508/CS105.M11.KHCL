
// DrawEllipseView.cpp : implementation of the CDrawEllipseView class
//

#include "pch.h"
#include "framework.h"
// SHARED_HANDLERS can be defined in an ATL project implementing preview, thumbnail
// and search filter handlers and allows sharing of document code with that project.
#ifndef SHARED_HANDLERS
#include "DrawEllipse.h"
#endif
#include "CDrawEllipse.h"
#include "DrawEllipseDoc.h"
#include "DrawEllipseView.h"
#include "CFill.h"
#ifdef _DEBUG
#define new DEBUG_NEW
#endif


// CDrawEllipseView

IMPLEMENT_DYNCREATE(CDrawEllipseView, CView)

BEGIN_MESSAGE_MAP(CDrawEllipseView, CView)
	// Standard printing commands
	ON_COMMAND(ID_FILE_PRINT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, &CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, &CDrawEllipseView::OnFilePrintPreview)
	ON_WM_CONTEXTMENU()
	ON_WM_RBUTTONUP()
END_MESSAGE_MAP()

// CDrawEllipseView construction/destruction

CDrawEllipseView::CDrawEllipseView() noexcept
{
	// TODO: add construction code here

}

CDrawEllipseView::~CDrawEllipseView()
{
}

BOOL CDrawEllipseView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return CView::PreCreateWindow(cs);
}

// CDrawEllipseView drawing

void CDrawEllipseView::OnDraw(CDC* pDC)
{
	CDrawEllipseDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	if (!pDoc)
		return;
	CDrawEllipse::drawEllipse(pDC, 100, 100,50, 30, RGB(0, 155, 0));
	//CFill::BoundaryFill(pDC, 100, 100, RGB(255, 0, 0), RGB(0, 255, 0));		// Tô loang dùng đệ quy
	CFill::BoundaryFillEnhanced(pDC, 100, 100, RGB(0, 255, 0));		// Tô loang khử đệ quy bằng stack - Tô không phụ thuộc màu biên

	// TODO: add draw code for native data here
}


// CDrawEllipseView printing


void CDrawEllipseView::OnFilePrintPreview()
{
#ifndef SHARED_HANDLERS
	AFXPrintPreview(this);
#endif
}

BOOL CDrawEllipseView::OnPreparePrinting(CPrintInfo* pInfo)
{
	// default preparation
	return DoPreparePrinting(pInfo);
}

void CDrawEllipseView::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add extra initialization before printing
}

void CDrawEllipseView::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add cleanup after printing
}

void CDrawEllipseView::OnRButtonUp(UINT /* nFlags */, CPoint point)
{
	ClientToScreen(&point);
	OnContextMenu(this, point);
}

void CDrawEllipseView::OnContextMenu(CWnd* /* pWnd */, CPoint point)
{
#ifndef SHARED_HANDLERS
	theApp.GetContextMenuManager()->ShowPopupMenu(IDR_POPUP_EDIT, point.x, point.y, this, TRUE);
#endif
}


// CDrawEllipseView diagnostics

#ifdef _DEBUG
void CDrawEllipseView::AssertValid() const
{
	CView::AssertValid();
}

void CDrawEllipseView::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CDrawEllipseDoc* CDrawEllipseView::GetDocument() const // non-debug version is inline
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CDrawEllipseDoc)));
	return (CDrawEllipseDoc*)m_pDocument;
}
#endif //_DEBUG


// CDrawEllipseView message handlers
